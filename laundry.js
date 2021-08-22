const ITEMDATAUP = 'itemDataUp';
const ITEMDATABOTTOM = 'itemDataBottom';
const ITEMDATAOUTER = 'itemDataOuter';
let arr = [];
let codeNameArr = [];
let selectType;

function seletTypeFuc() {  //종류선택 - 코드 연결
  let changeType;
  if(selectType == "up"){
    changeType = ITEMDATAUP;
  }
  else if(selectType == "bottom"){
    changeType = ITEMDATABOTTOM;
  }
  else if(selectType == "outer"){
    changeType = ITEMDATAOUTER;
  }
  return changeType;
}

function codeSelected(codeSelect) {    //선택된 코드 string
  const selected = $(codeSelect).val();
  return selected;
}

                //LS key index, selet option
function callCodes(typeSelect, codeSelect) {    //코드 불러오고 나타내기
  const type = typeSelect;   
  codeNameArr = [];
  
  arr = JSON.parse(localStorage.getItem(type));
  
  for (let i=0; i < arr.length; i+=1) {
    codeNameArr.push(arr[i].code);
  }

  for(let count = 0; count < codeNameArr.length; count++){                
    const option = $("<option value=" + codeNameArr[count] + ">" + codeNameArr[count] + "</option>");
    $(codeSelect).append(option);
  }
}

function settingCode() {
  const typeSelect = [ITEMDATAUP, ITEMDATABOTTOM, ITEMDATAOUTER];
  const codeSelect= ['.codeSelectUPLa', '.codeSelectBOLa', '.codeSelectOULa'];
  // const codeSelect= [['.codeSelectUPLa', '.codeSelectUPLa2', '.codeSelectUPLa3'],                             '.codeSelectBOLa', '.codeSelectOULa'];
  for (let i=0; i < typeSelect.length; i+=1) {
    callCodes(typeSelect[i], codeSelect[i]);
  }

  // for (let i=0; i < typeSelect.length; i+=1) {
  //   console.log(codeSelect[i].length);
  //   for (let k=0, k < codeSelect[i].length; k+=1) {
  //     callCodes(typeSelect[i], codeSelect[i][k]);
  //   }
  // }  //임시
}

settingCode();

function uploadWashData() {
  const isCode = $(".codeSelectUP option:selected").val();
  const dataForm = {
    up : {
      sClass : ".codeSelectUPLa",
      type : ITEMDATAUP
    },
    bottom : {
      sClass : ".codeSelectBOLa",
      type : ITEMDATABOTTOM
    },
    outer : {
      sClass : ".codeSelectOULa",
      type : ITEMDATAOUTER
    }
  }
  const dataFormUP = dataForm.up;
  const dataFormBO = dataForm.bottom;
  const dataFormOU = dataForm.outer;
  
  function callAndChange(selectedClass, type) {
    let codeName = codeSelected(selectedClass);   //selectedClass == class
    if (!(codeName === '코드선택')) {
      let storageArr = JSON.parse(localStorage.getItem(type));
      let idx = storageArr.findIndex(function(item) {return item.code === codeName});
      let codeData = storageArr[idx];
      codeData.wash = true;
      codeData.wear = 0;
      localStorage.setItem(type, JSON.stringify(storageArr));
    }
  } 

  callAndChange(dataFormUP.sClass, dataFormUP.type);
  callAndChange(dataFormBO.sClass, dataFormBO.type);
  callAndChange(dataFormOU.sClass, dataFormOU.type);
  alert('확인되었습니다.');
  location.reload();
}