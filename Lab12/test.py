from fastapi import FastAPI, Body

student ={
    "29":{
        "ID": "29",
        "first_name": "John",
        "last_name": "Doe"
        
    }
}

app = FastAPI()


@app.get("/students/all")
async def get_all_students():
    return student

@app.get("/students/{student_id}")
async def get_student(student_id: int):
    if str(student_id) not in student:
        return {"Error": "Student does not exist"}
    else:
        return student[str(student_id)]
    
@app.post("/students/new/")
async def create_student(student_id: int = Body(...), first_name: str = Body(...), last_name: str = Body(...)):
    if str(student_id) in student:
        return {"Error": "Student already exists"}
    student[str(student_id)] = {
        "ID": student_id,
        "first_name": first_name,
        "last_name": last_name
    }
    return student[str(student_id)]

@app.post("/students/new/{first_name}/{last_name}/{student_id}")
async def create_student_from_path(student_id: int, first_name: str, last_name: str):
    if str(student_id) in student:
        return {"Error": "Student already exists"}
    student[str(student_id)] = {
        "ID": student_id,
        "first_name": first_name,
        "last_name": last_name
    }
    return student[str(student_id)]

@app.post("/students/newForm")
async def create_student_from_query(student_id: int, first_name: str, last_name: str):
    if str(student_id) in student:
        return {"Error": "Student already exists"}
    student[str(student_id)] = {
        "ID": student_id,
        "first_name": first_name,
        "last_name": last_name
    }
    return student[str(student_id)]
        



    

