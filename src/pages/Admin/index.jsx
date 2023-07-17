// Funcionalidades / Libs:
import { useState } from 'react';

// Services:
import { auth } from '../../services/firebaseConnection';
import { signOut } from 'firebase/auth';

// Assets:
import { BsTrash } from "react-icons/bs";

// Estilo:
import './admin.scss';


export default function Admin() {
    const [inputTarefa, setInputTarefa] = useState('');

    function onSubmitTarefa(e) {
        e.preventDefault();

        alert('Add Tarefa!');

        setInputTarefa('');
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
                        />
                        <button type="submit">Salvar tarefa</button>
                    </form>

                    <div className="list-tarefas">

                        <article className='tarefa-item'>
                            <span className='nome-tarefa'>
                                <input
                                    type="checkbox"
                                    id="tarefa-id"
                                />
                                <label htmlFor="tarefa-id">Lorem ipsum dolor sit amet consectet...</label>
                            </span>
                            <span className="acoes-tarefa">
                                <BsTrash />
                            </span>
                        </article>

                        <article className='tarefa-item'>
                            <span className='nome-tarefa'>
                                <input
                                    type="checkbox"
                                    id="tarefa-id"
                                />
                                <label htmlFor="tarefa-id">Lorem ipsum dolor sit amet consectet...</label>
                            </span>
                            <span className="acoes-tarefa">
                                <BsTrash />
                            </span>
                        </article>

                        <article className='tarefa-item'>
                            <span className='nome-tarefa'>
                                <input
                                    type="checkbox"
                                    id="tarefa-id"
                                />
                                <label htmlFor="tarefa-id">Lorem ipsum dolor sit amet consectet...</label>
                            </span>
                            <span className="acoes-tarefa">
                                <BsTrash />
                            </span>
                        </article>

                    </div>
                </section>

                <button className='btn-logout' onClick={onClickLogout}>
                    Sair
                </button>

            </div>
        </main>
    )
}