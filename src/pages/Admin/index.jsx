// Funcionalidades / Libs:
import { useState, useEffect } from 'react';

// Services:
import { auth, db } from '../../services/firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// Assets:
import { BsTrash } from "react-icons/bs";

// Estilo:
import './admin.scss';


export default function Admin() {
    const [inputTarefa, setInputTarefa] = useState('');

    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);

    const [editTarefa, setEditTarefa] = useState('');


    useEffect(()=> {
        async function carregaTarefas() {
            const userDetalhes = localStorage.getItem('@detalheUser');
            setUser(JSON.parse(userDetalhes));

            if(userDetalhes) {
                const data = JSON.parse(userDetalhes);

                const colecaoRef = collection(db, "tarefas");
                const q = query(colecaoRef, orderBy('created', 'desc'), where('userId', '==', data?.uid));

                onSnapshot(q, (snapshot)=> {
                    let tempLista = [];

                    snapshot.forEach((tarefa)=> {
                        tempLista.push({
                            id: tarefa.id,
                            tarefa: tarefa.data().tarefa,
                            done: tarefa.data().done,
                            edit: false,
                            userId: tarefa.data().userId
                        })
                    })
                    // console.log(tempLista);
                    setTarefas(tempLista);
                })
            }
        }
        carregaTarefas();
    }, []);

    // Create:
    async function onSubmitTarefa(e) {
        e.preventDefault();
        // alert(`Add a tarefa "${inputTarefa}"`);

        await addDoc(collection(db, "tarefas"), {
            tarefa: inputTarefa,
            created: new Date(),
            done: false,
            userId: user?.uid
        })
        .then(()=> {
            setInputTarefa('');                        
        })
        .catch((error)=> {
            console.log('ERRO AO REGISTRAR TAREFA!');
            console.log(error);
        })
    }

    async function onClickLogout() {
        await signOut(auth)
        .then(()=> {
            alert('VOCÊ DESLOGOU!');
        })
        .catch((error)=> {
            console.log(`ERRO AO DESLOGAR!`);
            console.log(error);
        })
    }

    // Delete:
    async function onClickDeleteTarefa(id) {
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef)
        .then(()=> {
            console.log('Tarefa DELETADA no DB!');
        })
        .catch((error)=> {
            console.log('ERRO AO DELETAR TAREFA!');
            console.log(error);
        })
    }

    // Update:
    function isEdit(item) {
        const newTarefas = [...tarefas];
        newTarefas.map((tarefa) => (tarefa.id === item.id ? (tarefa.edit = !tarefa.edit) : tarefa)); // mudar edit para TRUE
        setTarefas(newTarefas);
    }
    async function isDone(item) {
        // const newTarefas = [...tarefas];
        // newTarefas.map((tarefa) => (tarefa.id === item.id ? (tarefa.done = !tarefa.done) : tarefa)); // mudar edit para TRUE
        // setTarefas(newTarefas);

        // UPDATE DO DB FIREBASE:
        const docRef = doc(db, "tarefas", item.id);
        await updateDoc(docRef, {
            done: !item.done
        })
        .then(() => {
            console.log("TAREFA FINALIZADA NO DB");
        })
        .catch(() => {
            console.log("ERRO AO ATUALIZAR");
        })
    }

    function onClickEdit(item) {
        // if(!editTarefa) {
        setEditTarefa(item.tarefa);
        
        isEdit(item);                
    }
    function onEnterDown(event, item) {
        if(event.key === "Enter") {
            if(editTarefa.length > 0) {
                handleUpdateTarefa(item);                
            } else {
                onClickDeleteTarefa(item.id);
            }
        }
    }

    async function handleUpdateTarefa(item) {
        isEdit(item);

        if(editTarefa !== item.tarefa) {
            if(editTarefa.length > 0) {
                // UPDATE DO DB FIREBASE:
                const docRef = doc(db, "tarefas", item.id);
                await updateDoc(docRef, {
                    tarefa: editTarefa
                })
                .then(() => {
                    console.log("TAREFA ATUALIZADA NO DB");
                })
                .catch(() => {
                    console.log("ERRO AO ATUALIZAR");
                })
            } else {
                onClickDeleteTarefa(item.id);
            }     
        }
        // return;
    }

    return (
        <main className="admin-container">
            <div className="grid">

                <h1>Minhas Tarefas</h1>

                <section className="form-tarefas">
                    <form onSubmit={onSubmitTarefa}>
                        <label htmlFor="input-tarefa">Insira o nome da tarefa:</label>
                        <input
                            type="text"
                            id="input-tarefa"
                            placeholder='Digite sua tarefa...'
                            value={inputTarefa}
                            onChange={(e)=> setInputTarefa(e.target.value)}
                            required
                            autoComplete='off'
                        />
                        <button type="submit">Salvar tarefa</button>
                    </form>

                    <div className="list-tarefas">

                        {tarefas.length === 0 && <span style={{textAlign: "center"}}>Nenhuma tarefa adicionada!</span>}

                        {tarefas.map((tItem)=> (
                        <article key={tItem.id} className='tarefa-item'>
                            <span className='nome-tarefa'>
                                <input
                                    type="checkbox"
                                    title='Feito'
                                    onClick={()=> isDone(tItem)}
                                />

                                {tItem.edit ? (
                                    <>
                                    <div 
                                        id="backdrop"
                                        onClick={()=> handleUpdateTarefa(tItem)}
                                    >
                                    </div>
                                    <input
                                        id='input-edit'
                                        autoFocus
                                        type='text'
                                        value={editTarefa}
                                        onChange={(e)=> setEditTarefa(e.target.value)}
                                        onKeyDown={(e)=> onEnterDown(e, tItem)}
                                    />
                                    </>
                                ) : (
                                    <label
                                        className={tItem.done ? "tarefa-done" : ""}
                                        onClick={()=> onClickEdit(tItem)}
                                    >{tItem.tarefa}</label>
                                )}
                            </span>

                            <span className="acoes-tarefa">
                                <BsTrash 
                                    onClick={()=> onClickDeleteTarefa(tItem.id)}
                                    title='Exluir' 
                                />
                            </span>
                        </article>
                        ))}

                    </div>
                </section>

                <button className='btn-logout' onClick={onClickLogout}>
                    Sair
                </button>

            </div>
        </main>
    )
}