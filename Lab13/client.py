
import uvicorn
from fastapi import FastAPI, Request, Form, HTTPException, Body
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from model import *

template = Jinja2Templates(directory="./templates")
app = FastAPI()

@app.get("/login", response_class=HTMLResponse)
async def index(request: Request):
    return template.TemplateResponse("index.html", {"request": request})

# @app.post("/login")
# async def login(request: Request,student_id: int = Body(...), password: int = Body(...)):
#     student = Student.login(student_id, password)
#     print(student)
#     if student:
#         # Successful login
#         return {"student_id": student_id, "password": password}
#     else:
#         # Invalid login
#         return {"Error": "Invalid login"}

@app.post("/login")
def getform(request: Request, student_id: int = Form(...), password: int = Form(...)):
    student = Student.login(student_id, password)
    print(student)
    if student:
        # Successful login
        print("Successful login")
        data = {"student_id": student_id, "password": password}
        return  template.TemplateResponse("update_score.html", {"request": request, "data":data})
    else:
        # Invalid login
        print("Failed to login")
        return {"Error": "Invalid login"}
    
@app.post("/transcript")
@app.post("/transcript")
def print_transcript(request: Request, 
                    score_web: str = Form(...),
                    score_database: str = Form(...),
                    score_software: str = Form(...),
                    score_art: str = Form(...)):
    # Define the grade scheme
    grade_scheme = [
        {"Grade": "A", "min": 80, "max": 100},
        {"Grade": "B", "min": 70, "max": 79},
        {"Grade": "C", "min": 60, "max": 69},
        {"Grade": "D", "min": 50, "max": 59},
        {"Grade": "F", "min": 0, "max": 49}
    ]
    
    # Create a dictionary to store scores and grades for each course
    course_scores_and_grades = {
        "Web_Programming": {"score": score_web, "grade": None},
        "Database_Systems": {"score": score_database, "grade": None},
        "Software_Engineering": {"score": score_software, "grade": None},
        "Artificial_Intelligence": {"score": score_art, "grade": None}
    }
    
    # Calculate grades for each course
    for course_name, data in course_scores_and_grades.items():
        # Convert the score to an integer
        score = int(data["score"])
        
        # Calculate the grade based on the grade scheme
        for grade_info in grade_scheme:
            if grade_info["min"] <= score <= grade_info["max"]:
                data["grade"] = grade_info["Grade"]
                break  # Stop searching for grades
        
    return  template.TemplateResponse("transcript_page.html", {"request": request, "data":course_scores_and_grades})




if __name__ == "__main__":
    uvicorn.run("client:app", host="127.0.0.1", port=8000)
    
    