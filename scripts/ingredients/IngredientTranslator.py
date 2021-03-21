import time
import sys

from shutil import copyfile

file_prefix = "scripts/ingredients/"

def main():
  ndbNo = int(input("NDB No:"))
  ingredient = getIngredient(ndbNo)

  nameOfIngredient = str(input("short name:"))
  foodGroup = str(input("myfood group:"))
  foodCategory = str(input("food category beef/fish/legumes/poultry/etc:") or "")
  myPlateServingSize = input("my plate serving size:" or "")

  backupCurrentFile()

  insertIngredient(ndbNo, ingredient, nameOfIngredient, foodGroup, foodCategory, myPlateServingSize)


def insertIngredient(nbdNo, ingredient, nameOfIngredient, foodGroup, foodCategory, myPlateServingSize) :
  f = open( (file_prefix + "out/current.csv"), "r")

  contents = f.readlines()
  f.close()

  i = findNewIndex(contents, nbdNo)
  ingredient = ingredient.strip("\n")

  insertLine = "" 
  if(i == len(contents)) :
    insertLine = "\n"

  insertLine += str(ingredient) + "," + str(nameOfIngredient) + "," + str(foodGroup) +  "," + str(foodCategory) + "," + str(myPlateServingSize) 

  if(i < len(contents)):
    insertLine += "\n"

  contents.insert(i, insertLine)

  f = open( (file_prefix + "out/current.csv"), "w")
  contents = "".join(contents)
  f.write(contents)
  f.close()
  



def findNewIndex(lines, newNbdNo):
  count = 2

  for i in range(1,len(lines)):
    line = lines[i]
    curNbdNo = int((line.split(",", 1))[0])
    if newNbdNo < curNbdNo:
      count += 1
      continue
    elif curNbdNo == newNbdNo:
      raise Exception("item already in condensed db")
    else:
      return count

  return count

def backupCurrentFile():
  currentFileName = file_prefix + "out/current.csv"
  backupFileName = file_prefix + "out/current-" + str(int(time.time())) + ".csv"

  copyfile(currentFileName, backupFileName)


def getIngredient(ndbNo): 
  with open(file_prefix + "USDA_RAW_FOODS_NUTRITION_REF.csv") as reference:
    fetchedLine = None

    first = False
    for line in reference:
      if first == False:
        first = True
        continue

      num = int((line.split(",", 1))[0])
      if num == ndbNo:
        fetchedLine = line
        break

  if fetchedLine is None:
    raise Exception("could not find database line number")

  return fetchedLine

main()