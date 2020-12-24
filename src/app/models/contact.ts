export interface Contact {
    id: string,
    firstname: string, 
    lastname: string,
    initials: string,
    company?: string,
    avatar?: string,
    contact: {
        phone: string,
        email?: string        
    },
    createdDate?: any,
    lastModified?: any,
    isNew?: boolean,
    onDelete?: boolean,
    editMenu?: boolean
}
