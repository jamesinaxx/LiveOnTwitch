import { FunctionComponent, ComponentChildren } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitch,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import ColorModeToggle from './buttons/ColorModeToggle';
import Link from './Link';
import { Footer } from '../styleMixins';

interface LayoutProps {
  children: ComponentChildren;
  shown: boolean;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, shown }) => (
  <div>
    {children}
    <ColorModeToggle shown={shown} />
    <Footer>
      <Link href="https://github.com/jamesinaxx">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </Link>
      <Link href="https://twitch.tv/jamesinaxx">
        <FontAwesomeIcon icon={faTwitch} size="2x" />
      </Link>
      <Link href="https://twitter.com/jamesinaxx">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </Link>
    </Footer>
  </div>
);

export default Layout;
