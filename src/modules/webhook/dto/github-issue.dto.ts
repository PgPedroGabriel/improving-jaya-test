interface Issue {
  number: number;
}

interface Repository {
  name: string;
}

export class GithubIssueDto {
  action: string;
  issue: Issue;
  repository: Repository;
}
