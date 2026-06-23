import { Title } from '../../../common/templates/MainLayout';
import AddActivityButton from '../../atoms/AddActivityButton';
import Revenue from '../../atoms/Revenue';
import ActivityList from '../../organisms/ActivityList';
import SearchButton from '../../organisms/SearchButton';
import Toolbar, { LeftArea, RightArea } from '../../organisms/Toolbar';

export default function ListActivityPage() {
  return (
    <>
      <Title>Activities</Title>

      <Toolbar>
        <LeftArea>
          <AddActivityButton />
          <SearchButton />
        </LeftArea>
        <RightArea>
          <Revenue />
        </RightArea>
      </Toolbar>

      <ActivityList />
    </>
  );
}
