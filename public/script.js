const API_URL = "http://localhost:8000/api";
const input=document.getElementById('input');
const taskList=document.getElementById('tasklist');
const btn=document.getElementById('btn');
async function getData(){
try{
  const res= await fetch(`${API_URL},/getdata`);
 const todos= await res.json();
 taskList.innerHTML="";
 todos.forEach(todo=>addToUi(todo));
}
catch(error){
 console.error("ERROR :",error);
}
}


async function addData(text){
try{
  const res= await fetch(`${API_URL},/adddat`,{
   method:'POST',
   headers:{
   'Content-Type':'application/json';
}
   body:JSON.stringify({text:text,done:false};

});
if(!res.ok) throw new Error("error couldnt add todo");
 const newtodo= await res.json();
 return newtodo;
}
catch(error){
 console.error("ERROR :",error);
}
}



function addToUi(todo) {
   if(input.value===""){
     alert(`you must write a task to add`);
   }else{
   let li=document.createElement("li");
   li.innerHTML=input.value.trim();
   let cross=document.createElement("span");
    cross.innerHTML="×";
     li.appendChild(cross);
     taskList.appendChild(li);
   }
  input.value="";
}


  taskList.addEventListener("click",(e)=>{
  if(e.target.tagName==="LI"){
    e.target.classList.toggle("checked");
  }else if(e.target.tagName==="SPAN"){
    deltodo(e.id,li);
  }

  });
  
  btn.addEventListener("click",()=>{
   const newTodo=addData(input.value.trim());
  addToUi(newTodo);
input.value="";
});
