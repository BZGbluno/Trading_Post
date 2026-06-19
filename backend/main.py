from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from api.health_check import router as health_check_router
from logging_config import setup_logging
from api.users import router as user_router
from api.messages import router as messages_router

# initiate logger
setup_logging()

# start app
app = FastAPI()


# Register endpoints
app.include_router(health_check_router)
app.include_router(user_router)
app.include_router(messages_router)


# Change this to match your incoming services ports
origins = []

# Add CORS middleware to allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
