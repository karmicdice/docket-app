import React from 'react';
import {InertiaLink} from '@inertiajs/inertia-react';

import {Project} from 'app/types';
import {archiveProject, deleteProject, unarchiveProject} from 'app/actions/projects';
import ContextMenu from 'app/components/contextMenu';
import {InlineIcon} from './icon';
import {useProjects} from 'app/providers/projects';

type ContextMenuProps = React.ComponentProps<typeof ContextMenu>;

type Props = {
  project: Project;
  alignMenu?: ContextMenuProps['alignMenu'];
};

export default function ProjectMenu({project, alignMenu = 'left'}: Props) {
  const [_, setProjects] = useProjects();

  async function handleDelete() {
    await deleteProject(project);
    setProjects(null);
  }
  async function handleUnarchive() {
    await unarchiveProject(project);
    setProjects(null);
  }
  async function handleArchive() {
    await archiveProject(project);
    setProjects(null);
  }

  return (
    <ContextMenu alignMenu={alignMenu}>
      <li>
        <InertiaLink className="context-item" href={`/projects/${project.slug}/edit`}>
          <InlineIcon icon="pencil" />
          Edit Project
        </InertiaLink>
      </li>
      {project.archived ? (
        <li>
          <button className="context-item" onClick={handleUnarchive}>
            <InlineIcon icon="archive" />
            Unarchive Project
          </button>
        </li>
      ) : (
        <li>
          <button className="context-item" onClick={handleArchive}>
            <InlineIcon icon="archive" />
            Archive Project
          </button>
        </li>
      )}
      <li>
        <button className="context-item" onClick={handleDelete}>
          <InlineIcon icon="trash" />
          Delete
        </button>
      </li>
    </ContextMenu>
  );
}
