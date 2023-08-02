import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  // Common
  root: {
    height: '100vh',
    display: 'flex',
     maxWidth: '1200px', // Change this value to make the app wider
    margin: '0 auto', // Center the app horizontally
    flexDirection: 'column',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#BB4A4A'

  },
  column: { flexDirection: 'column' },
  main: {
    flex: 1,
    overflow: 'auto',
    flexDirection: 'column',
    display: 'flex',
    color: '#BB4A4A',
  },
  browntext: {
    flex: 1,
    overflow: 'auto',
    flexDirection: 'column',
    display: 'flex',
    color:'#BB4A4A',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

  },
  navy: {
    backgroundColor: '#FBFBFB',
  },
  white: {
    backgroundColor: '#ffffff',
  },
  footer: {},
  // choose screen
  cards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff'
  },
  // order screen
  red: {
    backgroundColor: '#771313',
    color: '#ffffff',
  },
  bordered: {
    borderWidth: 4,
    borderRadius: 5,
    borderColor: '#771313',
    margin: 15,
    borderStyle: 'groove',
  },
  row: {
    display: 'flex',
    padding: 10,
  },
  space: {
    padding: 25,
    textAlign: 'center',
    fontSize: 'large'
  },
  around: {
    justifyContent: 'space-around',
  },
  between: {
    justifyContent: 'space-between',
  },
  largeButton: {
    width: 250,
    height: 79
  },
  largeInput: {
    width: '60px!important',
    padding: '0!important',
    fontSize: '35px!important',
    textAlign: 'center!important',
  },

  logo: {
    height: 50,
  },
  largeLogo: {
    height: 100,
  },
  title: {
    marginTop: 27,
    color: '#BB4A4A'
  },
  card: { margin: 10 },
  media: { width: 200 },
  ready: {
    backgroundColor: '#0DFB14',
    color: '#ffffff',
    marginTop: 0,
  },
  processing: {
    backgroundColor: '#FB0032',
    color: '#ffffff',
    marginTop: 0,
  },
  // Signin/Signup
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


