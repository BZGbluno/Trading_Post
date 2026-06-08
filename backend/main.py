from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from api.health_check import router as health_check_router



# start app
app = FastAPI()


# Register endpoints
app.include_router(health_check_router)


# Change this to match your frontend port (8081)
origins = [
]

# Add CORS middleware to allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)