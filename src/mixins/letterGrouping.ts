
const letterGroups = (unfiltered: { value: any[] }, groupObj: { value: any[] }) => {
       unfiltered.value.map((element: any) => {
              // get the first letter  of each group name
              let elementStart = element.name.split("")[0].toLowerCase();
              console.log(element);
              // check if  there is any data returned
              if (elementStart) {
                     if (groupObj.value[0]) {
                            groupObj.value.forEach((value) => {
                                   console.log(value);
                                   if (Object.keys(value)[0] === elementStart) {
                                          console.log(Object.keys(value)[0] === elementStart);
                                          // add the group to the already existing object
                                          value.elementStart.push(element);
                                   } else {
                                          // create new object if the key doesnt exist yet
                                          groupObj.value.push({ [elementStart]: [element] });
                                   }
                            });
                     } else {
                            groupObj.value.push({ [elementStart]: [element] });
                     }
                     console.log(groupObj.value);
              }
       });


}
export default letterGroups