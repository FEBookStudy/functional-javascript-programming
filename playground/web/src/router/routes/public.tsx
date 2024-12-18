import { type RouteObject, Navigate } from 'react-router-dom'

import HomeRoutes from 'home/HomeRoutes'
import ProjectsRoutes from 'projects/ProjectsRoutes'
import MembersRoutes from 'members/MembersRoutes'

import LandingContent from '@/pages'
import { LayoutComponent } from '@/components'
import { PATH } from '@/data/path'

export const publicRoutes: RouteObject = {
  element: <LayoutComponent.Base />,
  children: [
    {
      children: [
        {
          path: PATH.landing,
          element: <LandingContent />,
        },
        {
          path: PATH.home,
          element: <HomeRoutes />,
        },
        {
          path: PATH.members,
          element: <MembersRoutes />,
        },
        {
          path: PATH.projects,
          element: <ProjectsRoutes />,
        },
        {
          path: '/',
          element: <Navigate to={PATH.landing} replace />,
        },
      ],
    },
  ],
}
