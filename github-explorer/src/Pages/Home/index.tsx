import React, { useState, FormEvent, useEffect } from 'react';
import styles from './styles.module.scss';
import logo from '../../Assets/GithubExplorer.svg';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Repository {
	full_name: string;
	description: string;
	owner: {
		login: string;
		avatar_url: string;
	};
}
const Home: React.FC = () => {
	const [inputError, setInputError] = useState('');
	const [newRepo, setNewRepo] = useState('');
	const [repositories, setRepositories] = useState<Repository[]>(() => {
		const storagedRepositories = localStorage.getItem(
			'@Github-Explorer:repositories'
		);

		if (storagedRepositories) {
			return JSON.parse(storagedRepositories);
		} else {
			return [];
		}
	});

	const handleClearList = () => {
		localStorage.removeItem('@Github-Explorer:repositories');
		setRepositories([]);
	};

	useEffect(() => {
		localStorage.setItem(
			'@Github-Explorer:repositories',
			JSON.stringify(repositories)
		);
	}, [repositories]);

	async function handleAddRepository(
		event: FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		if (!newRepo) {
			setInputError('Digite o autor/nome do repositório');
			return;
		}

		try {
			const response = await api.get(`/repos/${newRepo}`);
			const repository = response.data;
			setRepositories([repository, ...repositories]);
			setNewRepo('');
			setInputError('');
		} catch (error) {
			setInputError('Não encontramos esse repositório =(');
		}
	}
	return (
		<div className={styles.homeContainer}>
			<img src={logo} alt='github explorer' />
			<h1 className={styles.title}>Explore respositórios no Github</h1>
			<form
				className={`${styles.formContainer} `}
				onSubmit={handleAddRepository}
			>
				<input
					className={`${!!inputError ? styles.err : ''}`}
					value={newRepo}
					onChange={e => setNewRepo(e.target.value)}
					placeholder='Digite aqui o nome do repositório'
				/>
				<button type='submit'>Pesquisar</button>
			</form>
			{inputError && <span className={styles.error}>{inputError}</span>}

			{repositories.length > 0 ? (
				<div className={styles.repositories}>
					{repositories.map(repository => (
						<Link
							to={`/Repository/${repository.full_name}`}
							key={repository.full_name}
							href='#'
						>
							<img
								src={repository.owner.avatar_url}
								alt={repository.owner.login}
							/>
							<div>
								<strong>{repository.full_name}</strong>
								<p>{repository.description}</p>
							</div>
							<FiChevronRight size={20} />
						</Link>
					))}

					<button onClick={handleClearList}>Limpar Lista</button>
				</div>
			) : (
				console.log('< q 0')
			)}
		</div>
	);
};

export default Home;
