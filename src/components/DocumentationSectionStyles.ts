export const styles = {
  container: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: 'flex-start'
  },
  loadingBox: {
    textAlign: 'center',
    padding: '2rem'
  },
  emptyPaper: {
    p: 3,
    bgcolor: 'background.default'
  },
  list: {
    width: '100%',
    padding: 0,
    paddingLeft: 0
  },
  listItem: {
    '&:hover': {
      bgcolor: 'action.hover',
    },
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: 1,
    mb: 1,
    paddingLeft: 0,
    justifyContent: 'flex-start',
    width: 'auto'
  },
  documentName: {
    color: 'primary.main',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}; 