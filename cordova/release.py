import os
import shutil
import xml.dom.minidom as xml

# Get app version
config = xml.parse("config.xml")
version = config.firstChild.getAttribute("version")

# Build android app
os.system("cordova build android --release")

# Copy apk to releases folder
source = os.path.join("platforms", "android", "app", "build",
                      "outputs", "apk", "release", "app-release.apk")
shutil.copyfile(source, os.path.join(
    "releases", "AdvantageScout " + version + ".apk"))
shutil.copyfile(source, os.path.join(
    "releases", "AdvantageScout.apk"))
print('AdvantageScout', version, 'copied to "releases" folder')
