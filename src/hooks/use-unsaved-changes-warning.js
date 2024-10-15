import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';

function useUnsavedChangesWarning(hasUnsavedChanges, confirmProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const confirm = useConfirm();

  const usedConfirmProps = {
    title: 'Unsaved Changes',
    description: 'You have unsaved changes. Are you sure you want to leave?',
    confirmationText: 'Leave',
    cancellationText: 'Stay',
    ...confirmProps,
  };

  useEffect(() => {
    const unblock = navigate.block((transition) => {
      if (hasUnsavedChanges) {
        confirm(usedConfirmProps)
          .then(() => {
            unblock(); // Unblock the navigation temporarily
            navigate(transition.location); // Programmatically navigate
          })
          .catch(() => {
            // User cancelled, don't do anything
          });
        return false; // Block the navigation until user confirms
      }
      return true;
    });

    return () => unblock(); // Cleanup the block when component unmounts
  }, [hasUnsavedChanges, navigate, location, confirm]);
}

export default useUnsavedChangesWarning;
