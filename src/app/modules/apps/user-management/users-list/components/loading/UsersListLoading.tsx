const UsersListLoading = () => {
  const styles = {
    borderRadius: '0.475rem',
    boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
    backgroundColor: '#fff',
    color: '#7e8299',
    fontWeight: '500',
    width: 'auto',
    padding: '1rem 2rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  };

  return (
    <div style={{ ...styles, position: 'absolute', textAlign: 'center' }}>
      Processing...
    </div>
  );
};

export { UsersListLoading };
