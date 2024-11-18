from fastapi import FastAPI
from routes.get_jobs import router_get_jobs
from routes.insert_jobs import router_insert_jobs
from routes.insert_countries import router_insert_countries
app = FastAPI()
app.include_router(router_get_jobs)
app.include_router(router_insert_jobs)
app.include_router(router_insert_countries)
