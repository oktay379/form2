import "./style.css"
import { useState } from "react"

function App() {
  
  const [newItem, setNewItem] = useState("");   // newItem --> ""
  const [todos, setTodos] = useState([]);       // todos --> []

  function handleSubmit(e) {
    
    e.preventDefault();       // sayfa guncellenmesi onlendi
    
    // return ile dizin icine ...currentTodos sayesinde elemanların hepsi alinmis oldu, id title ve girilen degler dizin icine aktarilmis oldu
    setTodos(currentTodos => {  // arrow fonksiyon tanimlandi
      return [
        ...currentTodos,      // set todos icerisine yazilan tum argumanları her cagrildiginda tutmak icin ... kullanilir
        {
          id: crypto.randomUUID(), title: newItem  // setTodos dondugunde yeni bir object eklenecektir, title kısmı inputdan alınan value degeri alinacaktir 
        },
      ]
    })
    
    setNewItem("");  // input dondugunde tekrardan yenilenmesi ve sifirlanmasi icin setItem "" esitlendi
        
  }

  
  //console.log(todos)   //girilen dizin elemanlarını gormek icin consol yansitmis oldum

  // todo.id = id argumani verildi
  // currentTodos aslinda kullandigim prev bilgileridir, 
  // filter ile todo.id esit degilse silinme islemi gerceklesir direkt esit oldugu icin filter spread ozelligi ile silme islemini tamamlar
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  



  return (
    <>
    <form onSubmit={handleSubmit} className="new-item-form">
      
      <div className="form-row">
        
        <label style={{marginBottom: "1rem"}} htmlFor="item"> New Item </label>
        
        {/* 
          setNewItem(e.target.value) girilen metni setNewItem ile güncelledik  
          value={newItem} degeri metin icerisindeki deger kelimedir yukarıda "" tanimlandigi icin bos duruyor olacaktir
        */}

        <input onChange={(e) => setNewItem(e.target.value)} value={newItem} type="text" id="item" />
        
      </div>
      
      <button className="btn">
        Add
      </button>
      
    </form>

    <h1 className="header">To Do List</h1>
    
    <ul>

      {/* 
        todos olusturdugum dizindir eger icerik yoksa No Todos baslik gozukur 
        todos map ile donduruldu islem yapmak icin:
        birer li elementi olusturuldu map ile olusturuldugu icin key bilgileri verildi
        label input button bilgileri girildi
        button onClick func olusturuldu ve id bilgisi verildi arguman olarak
      */}

      {todos.length === 0 && "No Todos"}
      {todos.map(todo => {
        return (
          <li key={todo.id}>
            <label>
              <input type="checkbox"/>
              {todo.title}
            </label>
            <button 
              style={{marginLeft: "1rem"}} 
              className="btn btn-danger"
              onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        )
      })}
    </ul>
    </>
  )
}

export default App