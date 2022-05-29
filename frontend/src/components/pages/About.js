function About() {

    const classes = useStyles();

    return (
      <Paper elevation={0} className={classes.root}>
        <div className={classes.content}>
          <Typography variant='h6'>
            Zeiterfassungsprojekt
          </Typography>
          <br />
          <Typography>
            React Frontend written by <Link href='https://www.youtube.com/watch?v=czTksCF6X8Y&t=15s'>Alle</Link>
          </Typography>
          <Typography>
            Python Backend written by <Link href='https://www.youtube.com/watch?v=czTksCF6X8Y&t=15s'>Alle</Link>
          </Typography>
          <br />
          <Typography variant='body2'>
            © Gruppe was weis ich für ne zahl? 2022, all rights reserved.
          </Typography>
        </div>
      </Paper>
    )
  }