import ZODB, ZODB.FileStorage

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root()

import persistent

class Course(persistent.Persistent):
    def __init__(self, id,name="", credit=0):
        self.id = id
        self.name = name
        self.credit = credit
        
    def __str__(self):
        return "ID: %s, Coure name: %s, Credit: %d" % (str(self.id), self.name, self.credit)
    
    def setName(self, name):
        self.name = name
        
    def printDetail(self):
        print(self.__str__())
        
root.course1 = Course(1, "Python", 3)


