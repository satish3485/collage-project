# Validator Script
# Author: Pennati Lucas
# Only to be used by the masters, please avoid using it for your own page(s)
# This script runs on Python 2.7+, but NOT Python 3. Be sure to run it using ``python main.py''


# import HTML validator
from py_w3c.validators.html.validator import HTMLValidator
import os
import time
import sys


#Wait for valid input
decision = raw_input("Choose the category you want to test:\n\t1: hardware\n\t2: software\n\t3: internet\n\t4: games\nYour choice: ")
#Dict containing categories
categories = {'1':'hardware','2':'software','3':'internet','4':'games'}

#If an invalid category is chosen, the script quits.
try:
    correctPath = "../html/" + categories[decision] + "/"
except:
    print("Wrong number for category, quitting...")
    sys.exit()

#Get a list of all html files recursively
listOfFiles = [os.path.join(dp, f) for dp, dn, filenames in os.walk(correctPath) for f in filenames if os.path.splitext(f)[1] == '.html']


#Number of errors and warnings
numberOfErrors = 0
numberOfWarnings = 0


#Loop through all files 
for i in range(0,len(listOfFiles)):
    try:
        print "Testing file: " + listOfFiles[i] + " ==> ",
        #Instantiate a validator
        vld = HTMLValidator()
        #Validate through file
        vld.validate_file(listOfFiles[i])
        if vld.errors == [] and vld.warnings == []:
            print("All good")
        else:
            print("PROBLEM(S)")        
            if vld.errors != []:
                for errorIndex in range(0,len(vld.errors)):
                    numberOfErrors += 1
                    print("\t{ \n\t\tMessage: " + vld.errors[errorIndex]["message"] + '\n\t\tLine: ' + vld.errors[errorIndex]["line"] + '\n\t\tColumn: ' + vld.errors[errorIndex]["col"] + '\n\t\tMessage id: ' + vld.errors[errorIndex]["messageid"] + "\n\t}")
#            if vld.warnings != []:
#                numberOfWarnings += 1            
#                print(vld.warnings)
    except:
        print "!!WARNING!! Could not be checked. Perform the operation manually"
    #As per API conditions, wait 1 second
    time.sleep(1)

#Print some statistics
print("\n==> Errors: " + str(numberOfErrors) + "\n==> Warnings: " + str(numberOfWarnings))