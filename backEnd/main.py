from fastapi import FastAPI
from routes.get_jobs import router_get_jobs
from routes.insert_jobs import router_insert_jobs
from routes.insert_countries import router_insert_countries
from routes.get_locations import router_get_locations
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
JOBS_PREFIX="/jobs"
LOCATIONS_PREFIX="/location"
app.include_router(router_get_jobs,prefix=JOBS_PREFIX)
app.include_router(router_insert_jobs,prefix=JOBS_PREFIX)
app.include_router(router_insert_countries,prefix=JOBS_PREFIX)
app.include_router(router_get_locations,prefix=LOCATIONS_PREFIX)
