const API_URL = "http://localhost:8000/api";
const input=document.getElementById('input');
const taskList=document.getElementById('tasklist');
const btn=document.getElementById('add');

async function getData(){
try{
  const res= await fetch(`${API_URL}/getdata`);
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
  const res= await fetch(`${API_URL}/adddata`,{
   method:'POST',
   headers:{
   'Content-Type':'application/json'
}
   body:JSON.stringify({text:text,done:false}

});
if(!res.ok) throw new Error("error couldnt add todo");
 const newtodo= await res.json();
 return newtodo;
}
catch(error){
 console.error("ERROR :",error);
}
}

async function delData(id){
 try{
 const res=await fetch(`${API_URL}/deldata/${id}`,{
 method:'DELETE'
});

 if(!res.ok)throw new Error("error couldn't delete todo");
return true;
}
 catch(error){
  console.log("ERROR WHILE DELETING TODO");
}
}
}

function addToUi(todo) {
   let li=document.createElement("li");
   li.textContent=todo.text;
   li.dataset.id=todo._id;
   let cross=document.createElement("span");
    cross.innerHTML="×";
     li.appendChild(cross);
     taskList.appendChild(li);
  input.value="";
}

function removeFromUi(li){
  if(li){
  li.remove();
}
}

  taskList.addEventListener("click",(e)=>{
  if(e.target.tagName==="LI"){
    e.target.classList.toggle("checked");
  }else if(e.target.tagName==="SPAN"){
   const li=e.target.parentElement;
   const id=li.dataset.id;
    deltodo(id);
    removeFromUi(li);
  }

  });

  btn.addEventListener("click",async ()=>{
if(input.value.trim()==""){
   alert(" first enter a task to add ");
}
   const newTodo=await addData(input.value.trim());
   addToUi(newTodo);
   input.value="";
});
getdata();
