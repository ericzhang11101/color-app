import convert from 'color-convert'

let validColors = ["black","navy","darkblue","mediumblue","blue","darkgreen","green","teal","darkcyan","deepskyblue","darkturquoise","mediumspringgreen","lime","springgreen","aqua","cyan","midnightblue","dodgerblue","lightseagreen","forestgreen","seagreen","darkslategray","limegreen","mediumseagreen","turquoise","royalblue","steelblue","darkslateblue","mediumturquoise","indigo","darkolivegreen","cadetblue","cornflowerblue","mediumaquamarine","dimgray","slateblue","olivedrab","slategray","lightslategray","mediumslateblue","lawngreen","chartreuse","aquamarine","maroon","purple","olive","gray","skyblue","lightskyblue","blueviolet","darkred","darkmagenta","saddlebrown","darkseagreen","lightgreen","mediumpurple","darkviolet","palegreen","darkorchid","yellowgreen","sienna","brown","darkgray","lightblue","greenyellow","paleturquoise","lightsteelblue","powderblue","firebrick","darkgoldenrod","mediumorchid","rosybrown","darkkhaki","silver","mediumvioletred","indianred","peru","chocolate","tan","lightgrey","palevioletred","thistle","orchid","goldenrod","crimson","gainsboro","plum","burlywood","lightcyan","lavender","darksalmon","violet","palegoldenrod","lightcoral","khaki","aliceblue","honeydew","azure","sandybrown","wheat","beige","whitesmoke","mintcream","ghostwhite","salmon","antiquewhite","linen","lightgoldenrodyellow","oldlace","red","fuchsia","magenta","deeppink","orangered","tomato","hotpink","coral","darkorange","lightsalmon","orange","lightpink","pink","gold","peachpuff","navajowhite","moccasin","bisque","mistyrose","blanchedalmond","papayawhip","lavenderblush","seashell","cornsilk","lemonchiffon","floralwhite","snow","yellow","lightyellow","ivory","white"]


function checkColorType(color){
     let retObj = { }
     color = color.trim().toLowerCase()
     
     if (color.charAt(0) == '#'){
          if (color.length === 7 || color.length == 4){
               retObj.type = 'hex'
               return retObj
          }
          else if (color.length == 5 || color.length == 8){
               retObj.type =  'hexa'
          }
          retObj.val = color.substring(1)

     }
     else if (color.indexOf('rgba') !==  -1){
          retObj.type =  'rgba'
     }
     else if (color.indexOf('rgb') !== -1){
          retObj.type =  'rgb'
     }
     else if (color.indexOf('hsla') !== -1){
          retObj.type =  'hsla'
     }
     else if (color.indexOf('hsl') !== -1){
          retObj.type =  'hsl'
     }
     else if (color.indexOf('hwb') !== -1){
          retObj.type =  'rgb'
     }
     else if (color.indexOf('cmyk') !== -1){
          retObj.type =  'hsl'
     }
     else if (color.indexOf('ncol') !== -1){
          retObj.type =  'hsl'
     }
     else if (validColors.indexOf(color) !== -1){
     	retObj.type =  'string'
     }

}

function validColor(color){
     // check valid
     let temp = new Option().style
     temp.color = color
     return temp.color !== ''
}

function getHsla(color){
     

     // check type
     console.log('getting hsla')
     const type = checkColorType(color)
     // convert

     let newColor;
     
     switch (type){
          case 'hex': 
               
               let newColor = convert.hsl.hex()
               console.log('hex')
               
               
               break;
          case 'rgb': 

                break;
          case 'rgba': 

               break;
          case 'string': 

               break;
          case 'hsl': 

               break;
          case 'hwb': 

               break;
          case 'cmyk': 

               break;
          case 'ncol': 

               break;
          default:
          
     }
     console.log(newColor)
}

// convert to hsla 

// hex

// name

// rgb/rgba

// hwb

// cmyk

// hsl


export { validColor, getHsla}