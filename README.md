Context
=======
In deployed service it doesn't show up professionalism while you are working on server at the same time user are getting proxy error or other unexpected problem (Which was in fact happening for www.khadok.com's users ;)). 

Thus i built this project so i can easily use _"maintenance-page -m /path/to/my/temporary-down-html-files-dir"_ command to turn on maintenance page.

Example
=======
maintenance-page -m /path/to/my/temporary-down-html-files-dir

Options
=======
Available options:

	*	-h, --help             Print this help

	*	-P, --port NUMBER      Server port, by default 80

	*	-H, --host HOST        Server host, by default 0.0.0.0

	*	-m, --mount-dir FILE   Server directory from where index.html and related resources will be served, Required
	
