# 3장: Underscore.js를 직접 만들며 함수형 자바스크립트의 뼈대 익히기

### Underscore.js 그리고 Lodash

Lodash는 Underscore.js와 비슷해 코드도 비슷하지만 지연 평가 알고리즘을 활용해 코드의 성능을 더 개선한다고 한다.

이는 Lodash의 체인 객체와 Underscore.js의 체인 객체를 비교하면서 차이를 볼 수 있는데, Lodash의 체인 객체가 지연 평가를 위해서 더 구체적임을 알 수 있다.

```javascript
// Lodash의 채인 객체
({
  __actions__: [],
  __chain__: true,
  __index__: 0,
  __values__: undefined,
  __wrapped__: {
    __actions__: [
      { args: [/*func*/],
        func: function thru(value, interceptor) {},
        thisArg: undefined },
      { args: [/*func*/],
        func: function thru(value, interceptor) {},
        thisArg: undefined },
    ],
    __dir__: 1,
    __filtered__: true,
    __iteratees__: [
      { iteratee: function (num) {}, type: 1 },
    ],
    __takeCount__: 5,
    __views__: [],
    __wrapped__: {
      __actions__: [],
      __chain__: true,
      __index__: 0,
      __values__: undefined,
      __wrapped__: Array(200)
    }
  }
});

// Underscore.js의 체인 객체
({ _wrapped: Array(5), _chain: true });
```

Lodash의 성능 개선은 모두 체인 방식의 메서드 형식일 경우에만 동작한다.

Lodash의 성능 개선에 대한 방법은 크게 3 가지가 있는데,
1. `take`메서드를 활용할 경우
2. `map`메서드를 연속적으로 사용할 경우
3. 지연 실행
이렇게 3 가지가 있다.

##### `take`메서드를 활용할 경우

`.take()` 메서드는 배열의 시작부터 지정한 수의 요소를 가져와 새로운 배열을 생성하는 함수이다. 
Underscore.js의 경우 `.take()` 메서드를 활용해도 반복문을 전체 다 돌아야 하는 단점이 있지만
Lodash의 경우 `.take()` 메서드를 활용시 반복문을 효율적으로 도는 장점이 있다.

> 찾아지는 값들이 `list`의 앞쪽에 배치되어 있을 경우에 비교적 좋은 성능을 낸다.

##### `map` 메서드를 연속적으로 활용할 경우

```javascript
function mul10(num) { return num * 10 }
function sub10(num) { return num - 10 }
function square(num) { return num * num }

// Underscore.js
var list = [1, 2, 3, 4, 5];
var result2 =
  _.chain(list)
    .map(mul10)
    .map(sub10)
    .map(square)
    .value();

console.log(result2);

// Lodash
var list = [1, 2, 3, 4, 5];
var result1 =
  lodash.chain(list)
    .map(mul10)
    .map(sub10)
    .map(square)
    .value();

console.log(result1);
```

위의 코드에서 
Underscore.js의 경우는 루프를 15번 돌고 새로운 `Array` 객체가 3번 생성되며 `push`는 총 15번 일어난다. 
Lodash의 경우는 루프를 총 5번 돌고 내부에서 새로운 `Array` 객체도 1번 생성되며 `push`도 총 5번 일어난다.

그 이유는 코드의 동작 흐름을 절차지향적으로 표현 시 아래와 같다.

```javascript
// Underscore.js
var temp1 = [];
for(var i = 0; i < list.length; i++) {
  temp1.push(mul10(list[i]));
}

var temp2 = [];
for(i = 0; i < temp1.length; i++) {
  temp2.push(sub10(temp1[i]));
}

var temp3 = [];
for(i = 0; i < temp3.length; i++) {
  temp3.push(square(temp2[i]));
}

// Lodash
var temp = [];
for(var i = 0; i < list.length; i++) {
  temp.push(square(sub10(mul10(list[i]))));
}
```

>Lodash의 경우 1:1로 매핑해 한번의 `for` 반복문으로 연속 실행 되는 장점이 있다.

##### 지연실행

Underscore.js의 체인 객체는 메서드 실행 후 값을 즉시 변경하지만,
Lodash의 체인 객체는 최종적으로 `.value()` 와 같은 메서드를 실행하기 전까지 체인의 함수들이 실행되지 않는다는 특징이 있따.

### Underscore.js에서 주로 사용되는 데이터형

##### 데이터형

- 객체
- 배열
- arguments (인수)
- 유사-배열 객체

> 각 데이터 형에 따른 error handling이 명시적으로 `type`을 체크하지 않아도 되어 있다.
##### arguments (인수)

- 함수 호출에 전달된 모든 인수를 포함하는 객체
- `function`으로 선언된 함수 안에서만 사용이 가능하다.
- 유사-배열 객체이다.
```js
function sumUp() {
	let sum = 0;
	for ( const num of arguments) {
	sum += num;
	}
	return sum;
};
sumUp(1, 5, 10, -3, 6, 10);
sumUp(1, 5, 10, -3, 6, 10, 25, 88);
```

##### 유사-배열 객체

- `length` 속성이 있고 `item`에 접근하기 위해서 `index`를 활용하는 객체


### 쓸모 없어 보이는 함수 활용

- `.identify`를 활용해 유사 배열 객체에서 값 만을 도출해낼 수 있다.

```js
_.identity = function(v) {
  return v;
};
_.idtt = _.identity;
_.values = function(list) {
  return _.map(list, _.identity);
};

console.log(_.values({id: 5, name: "JE", age: 27}));
// [5, "JE", 27]
```

- `.noop` 메서드를 활용해 `.each` 메서드는 `.map` 메서드와 다르게 배열 내부를 전체 다 돌면서 새로운 값을 가져오지 못하게 했다.
```js
_.array = function() { return [] };
_.push_to = function(val, obj) {
  obj.push(val);
  return val;
};
_.noop = function() {};

_.map = bloop(_.array, _.push_to);
_.each = bloop(_.identity, _.noop);
```


### 하나의 함수로 여러 메서드 합성하기

- 기능이 비슷할 경우, `.bloop` 메서드 활용으로 각각에 해당하는 로직 설정이 가능해진다.
```js
function bloop(new_data, body) {
  return function(data, iteratee) {
    var result = new_data(data);
    if (isArrayLike(data)) {
      for (var i = 0, len = data.length; i < len; i++) {
        body(iteratee(data[i], i, data), result);
      }
    } else {
      for (var key in data) {
        if (data.hasOwnProperty(key))
          body(iteratee(data[key], key, data), result);
      }
    }
    return result;
  }
}

_.map = bloop(function() { // bloop의 두 부분을 _.map에 필요한 로직으로 설정
  return [];
}, function(val, obj) {
  return obj.push(val);
});

_.each = bloop(function(v) { // bloop의 두 부분을 _.each에 필요한 로직으로 설정
  return v;
}, function() {});
```


### validator에 따라 달라지는 함수

`if` 함수는 validator 인자에서 `true/false` 값에 따라 
`true`일 경우 `func` 함수가 실행  
`false`일 경우 `alter` 함수가 실행되는 함수이다. 

```js
_.if = function(validator, func, alter) {
  return function() {
    return validator.apply(null, arguments) ?
      func.apply(null, arguments) :
      alter && alter.apply(null, arguments);
  }
};

function sub(a, b) {
  return a - b;
}

var sub2 = _.if(
  function(a, b) { return a >= b; },
  sub,
  function() { return new Error("a가 b보다 작습니다."); });

sub2(10, 5);
// 5;

sub2(2, 5);
// Error: a가 b보다 작습니다.

var diff = _.if(
  function(a, b) { return a >= b; },
  sub,
  function(a, b) { return sub(b, a) });

diff(2, 5);
// 3

_.safety = _.with_validator = _.if;
```


### 함수형 프로그래밍 조합에 따른 코드 가독성

- 사례 1, 2, 3, 4 모두 똑같은 함수이다.
- 각각의 메서드들은 서로의 일에 가담하지 않아 재사용성도 높으며, 코드의 양이 줄어 가독성이 높아짐을 볼 수 있다.
```js
// 1
_.filter = function(data, predicate) {
  var result = [];
  if (isArrayLike(data)) {
    for (var i = 0, len = data.length; i < len; i++) {
      if (predicate(data[i], i, data)) result.push(data[i]);
    }
  } else {
    for (var i = 0, keys = _.keys(data), len = keys.length; i < len; i++) {
      if (predicate(data[keys[i]], keys[i], data)) result.push(keys[i]);
    }
  }
  return result;
};

// 2
_.filter = function(data, predicate) {
  var result = [];
  _.each(data, function(val, idx, data) {
    if (predicate(val, idx, data)) result.push(val);
  });
  return result;
};

// 3
_.filter = bloop(_.array, function(bool, result, val) {
  if (bool) result.push(val);
});

// 4
_.filter = bloop(_.array, _.if(_.idtt, _.rester(_.push)));
```


### 함수 == 로직

> 매번 로직을 직접 작성하는 것 보다 이미 잘 만들어진 고차함수에게 위임하는 식으로 코딩을 하는 것이 생산성 및 안정성 면에서 유리한 모습을 볼 수 있다.

