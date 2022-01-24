driedG = float(input("Weight dried (g):"))
cookedG = float(input("Weight cooked (g):"))
cannedG = cookedG * 1.66667
cookedMl = float(input("Volume cooked (mL):"))

print("Figuring out the ratio of dry beans to dry volume. Please look at the back of a dry bean bag and answer the next questions")
dryVolumeMl = float(input("One serving volume (ml):"))
dryWeightG = float(input("One serving weight(g):"))

dryMl = (dryVolumeMl / dryWeightG) * driedG

print("{")
print("driedG: " , str(driedG),",")
print("cookedG: " , str(cookedG), ",")
print("cannedG: " , str(cannedG), ",")
print("cookedMl: " , str(cookedMl), ",")
print("dryMl: " ,  str(dryMl))
print ("}")


