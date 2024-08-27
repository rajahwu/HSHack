export async function loader ({ params }) {
    const { leadCount } = params;
    const leads = [];
    for (let i = 0; i < leadCount; i++) {
        const lead = await Customer.autoCreate();
        leads.push(lead);
    }
    return leads;
}