import React from 'react';

const Modal = ({ isShowing, clearStorage, hide, currHistory }) => isShowing ?
    <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-container">
                    <div className="modal-element">
                        {currHistory !== null && (
                            <button className="btn-option" onClick={clearStorage}>Clear history</button>
                        )}
                    </div>
                    {currHistory.length === 0 ?
                        <span className="modal-info">History is empty</span> :
                        <table className="modal-table">
                            <thead>
                                <tr>
                                    <th>Base amount</th>
                                    <th>Conversion result</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            {currHistory.map(item =>
                                <tbody>
                                    <tr>
                                        <td><span>{item.amount}&nbsp;</span><span>{item.currFrom}</span></td>
                                        <td><span>{item.amountScore}&nbsp;</span><span>{item.currTo}</span></td>
                                        <td>{item.date}</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    }
                </div>
            </div>
        </div>
    </> : null;

export default Modal;