
const letterGroups = async (unfiltered: { value: any[] }, groupObj: { value: any[] }, query: string) => {

       groupObj.value = []

       unfiltered.value.forEach(async (element: any, i: number) => {

              // get the first letter  of each group name

              // let elementStart = element.name ? element.name.split("")[0].toLowerCase() : (element.firstName.split("")[0].toLowerCase() || element.friendName.split("")[0].toLowerCase());
              let elementStart = element[query].split("")[0].toLowerCase()
              // check if  there is any data returned
              if (elementStart) {

                     if (groupObj.value[0]) {
                            var isExist: any[] = []
                            groupObj.value.map(async val => {

                                   console.log([val, (Object.keys(val)[0] === elementStart)])
                                   if (Object.keys(val)[0] === elementStart) { return isExist = [val, (Object.keys(val)[0] === elementStart)] }

                            })


                            if (isExist[1]) {

                                   groupObj.value[groupObj.value.indexOf(isExist[0])][elementStart].push(element)

                                   console.log(groupObj.value)
                            }
                            else {
                                   console.log("it doesnt exist");
                                   groupObj.value.push({ [elementStart]: [element] })
                            }

                     } else {
                            console.log("once ran")
                            groupObj.value.push({ [elementStart]: [element] });
                     }
                     console.log(groupObj.value);
              }
       })


}
export default letterGroups