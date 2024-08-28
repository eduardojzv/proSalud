import { useRouteError } from "react-router"
import { Link } from "react-router-dom";

export default function NotFound() {
  const error:any=useRouteError()
  console.log("eeror",error);
  
  return (
    <div>
      <h1>404</h1>
      <p>Pagina no encontrada</p>
      <p>{error.statusTest || error.message}</p>
      <Link to="/">Volve al inicio</Link>
    </div>
  )
}