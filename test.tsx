const [session, setSession] = useState(null);

useEffect(() => {
    // This will run only on client-side
    import('@corbado/webcomponent')
        .then(module => {
            const Corbado = module.default || module;
            setSession(new Corbado.Session(projectID));
        })
        .catch(err => {
            console.log(err);
        });
}, []);

useEffect(() => {
    // Refresh the session whenever it changes
    if (session) {
        // @ts-ignore
        session.refresh((user: any) => {
            setUser(user);
        });
    }
}, [session]);