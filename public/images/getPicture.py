import os, shutil

path=r"d:\\file\\images-database"

targetPath = r"d:\\file\\images-database\\newFolder"

fns=[os.path.join(root,fn) for root,dirs,files in os.walk(path) for fn in files]

i = 1
for f in fns:
    print(f)
    str1 = f[0:-4]+str(i)+".png"
    print(str1)
    i = i + 1
    os.rename(f, str1)
    shutil.copy(str1,targetPath)
        
print(len(fns))
