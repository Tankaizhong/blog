// utils/router.ts
import { useNavigate } from 'react-router-dom'

export const useRouter = () => {
  const navigate = useNavigate()

  const navigateTo = (path: string) => {
    navigate(path)
  }

  const navigateBack = () => {
    navigate(-1)
  }

  const replacePath = (path: string) => {
    navigate(path, { replace: true })
  }

  return { navigateTo, navigateBack, replacePath }
}
