const COMMENTS_QUERY = `
    query Comments($username: String!, $endcursor: String) {
        user(login: $username) {
            issueComments(
                after: $endcursor
                first: 50
                orderBy: { field: UPDATED_AT, direction: DESC }
            ) {
                edges {
                    node {
                        bodyHTML
                        createdAt
                        url
                        repository {
                            nameWithOwner
                            url
                        }
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`;

const ISSUE_QUERY = `
    query Issues(
        $username: String!
        $sortBy: IssueOrderField!
        $sortOrder: OrderDirection!
        $endcursor: String
        $states: [IssueState!]
    ) {
        user(login: $username) {
            issues(
                after: $endcursor
                orderBy: { direction: $sortOrder, field: $sortBy }
                states: $states
                first: 50
            ) {
                edges {
                    node {
                        bodyHTML
                        closedAt
                        createdAt
                        number
                        repository {
                            nameWithOwner
                            url
                        }
                        state
                        title
                        url
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`;

const PULL_REQUEST_QUERY = `
    query PullRequests(
        $username: String!
        $sortBy: IssueOrderField!
        $sortOrder: OrderDirection!
        $endcursor: String
        $states: [PullRequestState!]
    ) {
        user(login: $username) {
            pullRequests(
                after: $endcursor
                orderBy: { direction: $sortOrder, field: $sortBy }
                states: $states
                first: 50
            ) {
                edges {
                    node {
                        additions
                        bodyHTML
                        closedAt
                        createdAt
                        deletions
                        mergedAt
                        mergedBy {
                            login
                            url
                        }
                        number
                        repository {
                            nameWithOwner
                            url
                        }
                        state
                        title
                        url
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`;

const ORGANIZATION_REPOSITORY_QUERY = `
    query OrganizationRepositories(
        $username: String!
        $sortBy: RepositoryOrderField!
        $sortOrder: OrderDirection!
        $endcursor: String
    ) {
        organization(login: $username) {
            repositories(
                after: $endcursor
                ownerAffiliations: OWNER
                orderBy: { direction: $sortOrder, field: $sortBy }
                first: 50
            ) {
                edges {
                    node {
                        nameWithOwner
                        createdAt
                        description
                        descriptionHTML
                        diskUsage
                        forkCount
                        homepageUrl
                        isArchived
                        isDisabled
                        isFork
                        isMirror
                        issues {
                            totalCount
                        }
                        licenseInfo {
                            name
                            url
                        }
                        mirrorUrl
                        name
                        parent {
                            nameWithOwner
                            url
                        }
                        primaryLanguage {
                            name
                            color
                        }
                        pullRequests {
                            totalCount
                        }
                        pushedAt
                        stargazerCount
                        watchers {
                            totalCount
                        }
                        url
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`;

const REPOSITORY_QUERY = `
    query UserRepositories(
        $username: String!
        $sortBy: RepositoryOrderField!
        $sortOrder: OrderDirection!
        $endcursor: String
    ) {
        user(login: $username) {
            repositories(
                after: $endcursor
                ownerAffiliations: OWNER
                orderBy: { direction: $sortOrder, field: $sortBy }
                first: 50
            ) {
                edges {
                    node {
                        nameWithOwner
                        createdAt
                        description
                        descriptionHTML
                        diskUsage
                        forkCount
                        homepageUrl
                        isArchived
                        isDisabled
                        isFork
                        isMirror
                        issues {
                            totalCount
                        }
                        licenseInfo {
                            name
                            url
                        }
                        mirrorUrl
                        name
                        parent {
                            nameWithOwner
                            url
                        }
                        primaryLanguage {
                            name
                            color
                        }
                        pullRequests {
                            totalCount
                        }
                        pushedAt
                        stargazerCount
                        watchers {
                            totalCount
                        }
                        url
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`;

const USER_QUERY = `
    query UserData($username: String!) {
        user(login: $username) {
            avatarUrl
            bio
            createdAt
            email
            followers {
                totalCount
            }
            following {
                totalCount
            }
            issues {
                totalCount
            }
            location
            login
            name
            pullRequests {
                totalCount
            }
            repositories {
                totalCount
            }
            twitterUsername
            url
            websiteUrl
        }
    }
`;

const ORGANIZATION_QUERY = `
    query OrganizationData($username: String!) {
        organization(login: $username) {
            avatarUrl
            createdAt
            email
            location
            login
            name
            repositories {
                totalCount
            }
            twitterUsername
            url
            websiteUrl
        }
    }
`;

const QUERY = {
    issueComments: COMMENTS_QUERY,
    issues: ISSUE_QUERY,
    organization: ORGANIZATION_QUERY,
    org_repositories: ORGANIZATION_REPOSITORY_QUERY,
    pullRequests: PULL_REQUEST_QUERY,
    repositories: REPOSITORY_QUERY,
    user: USER_QUERY,
};

export default QUERY;
