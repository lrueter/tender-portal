export const styles = {
  container: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto'
  },
  loadingBox: {
    textAlign: 'center',
    padding: '2rem'
  },
  emptyPaper: {
    p: 3,
    bgcolor: 'background.default'
  },
  listItem: {
    '&:hover': {
      bgcolor: 'action.hover',
    },
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: 1,
    mb: 1
  },
  documentName: {
    color: 'primary.main',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}; 