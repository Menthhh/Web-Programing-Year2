import requests

def post_student_data(name, surname, id):
    url = 'http://161.246.5.61:11610/students/new/'+name+'/'+surname+'/'+id
    response = requests.post(url)
    if response.status_code == 200:
        print("Request success")
        print("Response: ",response.text)
    else:
        print("Request failed. Status code: ",response.status_code)
        
def get_student_data():
    url = 'http://161.246.5.61:11610/students/html'
    response = requests.get(url)
    if response.status_code == 200:
        print("Request success")
        print("Response: ",response.text)
    else:
        print("Request failed. Status code: ",response.status_code)
        
def get_student_data_by_id(id):
    url = 'http://161.246.5.61:11610/students/html/'+id
    response = requests.get(url)
    if response.status_code == 200:
        print("Request success")
        print("Response: ",response.text)
    else:
        print("Request failed. Status code: ",response.status_code)
        
#post 3 students data

post_student_data('John','Doe','1234567890')
post_student_data('Jane','Doe','1234567891')
post_student_data('Joe','Doe','1234567892')

#get all students data
get_student_data()

#get student data by id
get_student_data_by_id('1234567890')
get_student_data_by_id('1234567891')
get_student_data_by_id('1234567892')
        