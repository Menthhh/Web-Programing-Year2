import ZODB, ZODB.FileStorage

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root()

import persistent
import transaction

class Course(persistent.Persistent):
    def __init__(self, credit, course_id, name):
        self.credit = credit
        self.course_id = course_id
        self.name = name

    def getCredit(self):
        return self.credit

    def setName(self, name):
        self.name = name

    def printDetail(self):
        print(f"ID: {self.course_id} Course: {self.name} , Credit: {self.credit}")

class Student(persistent.Persistent):
    def __init__(self, student_id, name):
        self.enrolls = []
        self.id = student_id
        self.name = name

    def enrollCourse(self, course):
        enrollment = Enrollment(self, course)
        self.enrolls.append(enrollment)
        return enrollment

    def getEnrollment(self, course):
        for enrollment in self.enrolls:
            if enrollment.getCourse() == course:
                return enrollment
        return None

    def printTranscript(self):
        print("Transcript:")
        print(f"ID: {self.id} Name: {self.name}")
        total_points = 0
        total_credits = 0
        print("Course list")
        for enrollment in self.enrolls:
            course = enrollment.getCourse()
            grade = enrollment.getGrade()
            credit = course.getCredit()
            total_points += grade * credit
            total_credits += credit
            print(f"ID: {course.course_id} Course: {course.name}, Grade: {grade}, Credits: {credit}")
        if total_credits > 0:
            gpa = total_points / total_credits
            print(f"Total GPA: {gpa:.2f}")

    def setName(self, name):
        self.name = name

class Enrollment(persistent.Persistent):
    def __init__(self, student, course):
        self.course = course
        self.grade = None
        self.student = student

    def getCourse(self):
        return self.course

    def getGrade(self):
        return self.grade

    def printDetail(self):
        print(f"ID: {self.student.id} Course: {self.course.name} , Credit: {self.course.credit}")

    def setGrade(self, grade):
        self.grade = grade


# Test case
if __name__ == "__main__":
    # Create course and student objects
    math_course = Course(3, "101", "Mathematics")
    physics_course = Course(4, "202", "Physics")
    alice = Student("65011610", "Tonkla Pokaew")
    bob = Student("610502320", "Bob Baba")

    # Create a dictionary to store courses and students
    courses = {
        math_course.course_id: math_course,
        physics_course.course_id: physics_course
    }

    students = {
        alice.id: alice,
        bob.id: bob
    }

    # Assign courses and students to the root object
    root.courses = courses
    root.students = students

    # Enroll students in courses
    alice.enrollCourse(math_course).setGrade(3)
    alice.enrollCourse(physics_course).setGrade(4)
    bob.enrollCourse(math_course).setGrade(3)
    transaction.commit()

    courses = root.courses
    for c in courses:
        course = courses[c]
        course.printDetail()
        print()
        
    students = root.students
    for s in students:
        student = students[s]
        student.printTranscript()
        print()
        
    connection.close()