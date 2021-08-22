const ITEMDATAUP = 'itemDataUp';
const ITEMDATABOTTOM = 'itemDataBottom';
const ITEMDATAOUTER = 'itemDataOuter';
let arr = [];
let codeNameArr = [];
let selectType;

function checkData(data) {
  const checking = localStorage.getItem(data);
  const array = [];
  if (checking === null){
    localStorage.setItem(data, JSON.stringify(array));
  }
}

checkData(ITEMDATAUP);
checkData(ITEMDATABOTTOM);
checkData(ITEMDATAOUTER);

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

function callCodes(typeSelect, codeSelect) {    //코드 불러오고 나타내기
  selectType = $(typeSelect).val();
  const type = seletTypeFuc();
  codeNameArr = [];
  
  arr = JSON.parse(localStorage.getItem(type));
  
  for (let i=0; i < arr.length; i+=1) {
    codeNameArr.push(arr[i].code);
  }

  $(codeSelect).empty();
  for(let count = 0; count < codeNameArr.length; count++){                
    const option = $("<option value=" + codeNameArr[count] + ">" + codeNameArr[count] + "</option>");
    $(codeSelect).append(option);
  }
}

function codeSelected(codeSelect) {    //선택된 코드 string
  const selected = $(codeSelect).val();
  return selected;
}

function callCodesIQ() {   //조회 - 코드 불러오기
  const typeSelect = '.typeSelectIQ option:selected';
  const codeSelect = '.codeSelectIQ';
  callCodes(typeSelect, codeSelect);
}

function codeSelectedIQ() {      //조회 - 확인 버튼 동작
  const selectedClass = '.codeSelectIQ';
  const codeName = codeSelected(selectedClass);
  if (codeName === '코드') {
    alert('코드를 선택해주세요.');
  } else {
    const type = seletTypeFuc();
    let storageArr = JSON.parse(localStorage.getItem(type));   //array
    const idx = storageArr.findIndex(function(item) {return item.code === codeName});
    const codeData = storageArr[idx];
    const wash = codeData.wash;     //boolean
    const wear = codeData.wear;
    const date = codeData.date;     //string
    if (wash === true) {
      $(".informationWash").append("<span> O</span>");
    } else if (wash === false) {
      $(".informationWash").append("<span> X</span>");
    }

    $(".informationWear").append("<span> " + wear + "회</span>");
    $(".informationDate").append("<span> " + date + "</span>");
    $('#inputDiv').addClass('invisible');
    $('#inquiryDiv').removeClass('invisible');
  }
}


function addData() {     //추가
  // let storeCode;
  selectType = $(".typeSelectADD option:selected").val();
  const type = seletTypeFuc();
  codeNameArr = [];
  
  const code = $('.addCode').val();  //input코드값
  const inputCode = {
    code : code,
    wash : false,       //boolean
    wear : 0,
    date : ''           //string
  }
  arr = JSON.parse(localStorage.getItem(type));
  
  for (let i=0; i < arr.length; i+=1) {
    codeNameArr.push(arr[i].code);
  }
  const found = codeNameArr.indexOf(code);
  if (found === -1) {
    arr.push(inputCode);
    localStorage.setItem(type, JSON.stringify(arr));
    alert('추가되었습니다.');
  } else {
    alert('이미 존재하는 code 입니다.');
  }
  location.reload();
}

function callCodesRM() {     //제거 - 코드 불러오기
  const typeSelect = '.typeSelectRM option:selected';
  const codeSelect = '.codeSelectRM';
  callCodes(typeSelect, codeSelect);
}


function codeSelectedRM() {       //제거 - 확인 버튼 동작
  const selectedClass = '.codeSelectRM';
  let codeName = codeSelected(selectedClass);   //string
  if (codeName === '코드') {
    alert('코드를 선택해주세요.');
  } else {
    const type = seletTypeFuc();
    let storageArr = JSON.parse(localStorage.getItem(type));   //array
    const idx = storageArr.findIndex(function(item) {return item.code === codeName});
    storageArr.splice(idx, 1);
    localStorage.setItem(type, JSON.stringify(storageArr));
  }
  location.reload();
}









