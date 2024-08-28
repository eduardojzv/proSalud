import { Outlet } from "react-router";
import Menu from "../components/menu/menu";
import styles from "./mainLayout.module.css"
import Footer from "../components/footer/footer";
export default function MainLayout() {
  //const [isLogged,setIslogged]=useState(true)
  const { layout } = styles
  return (
    <>
      <Menu />
      <main className={layout}>
          <Outlet />
      </main>
      <Footer/>
    </>
  )
}