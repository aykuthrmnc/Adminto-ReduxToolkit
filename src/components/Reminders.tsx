import classNames from 'classnames';
import { Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// type

const Reminders = () => {
    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                        <Dropdown.Item>Something Else</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h4 className="header-title mt-0 mb-3">
                    <i className="mdi mdi-notification-clear-all me-1"></i>
                    Upcoming Reminders
                </h4>
                <ul className="list-group mb-0 user-list">
                    <li className="list-group-item">
                        <Link to="#" className="user-list-item">
                            <div className="user float-start me-3">
                                <i className={classNames('mdi mdi-circle', 'text-')}></i>
                            </div>
                            <div className="user-desc overflow-hidden">
                                <h5 className="name mt-0 mb-1">title</h5>
                                <span className="desc text-muted font-12 text-truncate d-block">span font 12</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </Card.Body>
        </Card>
    );
};

export default Reminders;
