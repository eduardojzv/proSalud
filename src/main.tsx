import ReactDOM from 'react-dom/client'
import './index.css'
import "./translations/i18n"
import { router } from './routes/router.tsx'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './providers/themeProviders.tsx'
import { I18nextProvider } from 'react-i18next'
import i18next from './translations/i18n'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18next}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </I18nextProvider>,
)
