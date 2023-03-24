from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, HTMLResponse
from typing import Annotated
from imageai.Detection import ObjectDetection
import os

obj_detect = ObjectDetection()
execution_path = os.getcwd()
detector = ObjectDetection()
detector.setModelTypeAsYOLOv3()
detector.setModelPath( os.path.join(execution_path , "model/yolov3.pt"))
detector.loadModel()


def detect_objects(imagePath, outputPath):
    detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path , imagePath), output_image_path=os.path.join(execution_path , outputPath), minimum_percentage_probability=5)
    return detections

def create_detected_objects_list(detections):
    object_names = []
    for eachObject in detections:
        object_names.append(eachObject["name"])
    return object_names

def just_get_the_results(imagePath, outputPath):
    detections = detect_objects(imagePath, outputPath)
    object_names = create_detected_objects_list(detections)
    # dimension = detect_objects_dimension(detections)
    # print(dimension)
    return object_names

def get_dimensions(detections):
    dimensions = []
    print(detections)
    if len(detections) > 0:
        str_dimension = detect_objects_dimension(detections)
    return str_dimension

def detect_objects_dimension(detections, depth=50):
    # detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path , imagePath), output_image_path=os.path.join(execution_path , outputPath), minimum_percentage_probability=5)

    # Get the first detected object and its dimensions
    if len(detections) > 0:
        try:
            detection = detections[0]
        except:
            return "Volume Calculation Failed"
        dimensions = detection["box_points"]

        # Estimate the volume of the object
        height = abs(dimensions[3] - dimensions[1])
        width = abs(dimensions[2] - dimensions[0])
        # depth = 10 # replace with actual depth if available
        volume = height * width * depth
        volume_m = volume * (0.264583333/100)**3 # Convert from cubic pixels to cubic meters
        volume_cm = volume * 0.264583333 * 0.264583333 * 0.264583333 # Convert from cubic pixels to cubic centimeters
        #print("Volume of object: {:.2f} cubic meters".format(volume_m))
        #print("Volume of object: {:.2f} cubic cmeters".format(volume_cm))
        volume_str = "Volume of object: {:.2f} cubic meters".format(volume_m) + " // Volume of object: {:.2f} cubic cmeters".format(volume_cm)
    return volume_str

some_file_path = "./images/"
app = FastAPI()


# @app.get("/")
# async def root():
#     return {"message": "Hello World"}

@app.get("/images/input/{item_id}")
async def read_item(item_id):
    return FileResponse(some_file_path + "/input/" + item_id + ".jpg")

@app.get("/images/output/{item_id}")
async def read_item1(item_id):
    return FileResponse(some_file_path + "/output/" + item_id + ".jpg")

@app.get("/func/{item_id}")
async def read_item2(item_id):
    list = just_get_the_results("images/input/" + item_id + ".jpg", "images/output/" + item_id + ".jpg")
    detections = detect_objects("images/input/" + item_id + ".jpg", "images/output/" + item_id + ".jpg")
    dimensions = get_dimensions(detections)
    if len(detections) > 0:
        return {"Fount Objects": str(list), "Dimensions": str(dimensions)}
    else:
        return {"Fount Objects": str(list)}

@app.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    for file in files:
        UploadFile.write(file, data="image.jpg")
    return just_get_the_results("image.jpg", "image_output.jpg")


# @app.post("/files/")
# async def create_file(file: Annotated[bytes | None, File()] = None):
#     if not file:
#         return {"message": "No file sent"}
#     else:
#         return {"file_size": len(file)}
    
@app.get("/")
async def main():
    content = """
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)