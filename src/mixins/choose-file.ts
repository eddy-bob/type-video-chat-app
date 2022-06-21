var imagetype: string;
var showpreview: boolean;
var selectedimg: ArrayBuffer | undefined;
type FileType = {
       showpreview: boolean,
       selectedimg: ArrayBuffer,
       imagetype: string
}
const setValues = async (selectedim: ArrayBuffer, type: string) => {
       showpreview = true;
       selectedimg = selectedim;
       imagetype = type
}
const chooseImage = async (
       event: any,
       type: string,
       notify: any): Promise<FileType | {}> => {
       const returnData = await new Promise((resolve, reject): void => {
              imagetype = type;
              const imageData = new FileReader();
              const target = event.target.files[0];

              if (target && target.type.startsWith("image")) {
                     imageData.readAsDataURL(target);

                     imageData.onload = (e) => {
                            setValues(e.target!.result as ArrayBuffer, type)

                     };

                     imageData.onloadend = () => {

                            return resolve({

                                   showpreview, selectedimg, imagetype
                            })
                     }

              } else {
                     notify({
                            type: "error",
                            title: "Invalid format",
                            text: "File must be an image",
                     });

                     return
              }
       })

       return returnData as FileType
};

export default chooseImage