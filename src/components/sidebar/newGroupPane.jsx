import React from 'react';
import {
	STEP_1,
	STEP_2,
} from "../../contexts/sidebar/leftBarKeys";
import { Tab } from 'react-bootstrap';

import Step1 from './step1';
import Step2 from './step2';
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';

const NewGroupPane = () => {
	const { activeNewGroupKey } = useSidebarContext();

	return (
		<>
			<Tab.Container activeKey={activeNewGroupKey}>
				<Tab.Content className="overflow-auto flex-grow-1">
					<Tab.Pane eventKey={STEP_1}>
						<Step1 />
					</Tab.Pane>
					<Tab.Pane eventKey={STEP_2}>
						<Step2 />
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</>
	);
}

export default NewGroupPane;