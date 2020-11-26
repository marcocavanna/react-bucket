import { CreatableFunctionComponent } from '../../generic';
import TabPanel from './TabPanel';
import { TabsProps } from './Tabs.types';
declare type TabsComponent = CreatableFunctionComponent<TabsProps> & {
  Panel: typeof TabPanel;
};
declare const Tabs: TabsComponent;
export default Tabs;
