import { CreatableFunctionComponent } from '../../generic';
import { PanelProps } from './Panel.types';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import PanelFooter from './PanelFooter';
declare type PanelComponent = CreatableFunctionComponent<PanelProps> & {
  Body: typeof PanelBody;
  Footer: typeof PanelFooter;
  Header: typeof PanelHeader;
};
declare const Panel: PanelComponent;
export default Panel;
